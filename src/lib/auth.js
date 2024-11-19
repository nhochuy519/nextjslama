import { connecToDb } from "./utils";
import { User } from "./models";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

const login = async (credentials) => {
  try {
    connecToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error("Wrong credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, "profile la: ", profile);
      if (account.provider === "github") {
        connecToDb();

        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = await User.create({
              username: profile.name,
              email: profile.email,
              img: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  },
});

// callbacks để xử lý thêm logic khi các sự kiện xác thực diễn ra
// Trong trường hợp này, callback signIn sẽ được gọi khi người dùng đăng nhập.
// return true: Trả về true để cho phép quá trình đăng nhập tiếp tục. Nếu bạn trả về false, quá trình đăng nhập sẽ bị ngừng lại.
