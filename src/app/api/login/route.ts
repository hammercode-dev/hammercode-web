import { AuthJwtPayload } from "@/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = await axios.post(`${baseURL}/auth/login`, { email, password }).then((res) => res.data.data);

    const decoded = jwtDecode<AuthJwtPayload>(token);

    const res = NextResponse.json({
      token,
      payload: decoded,
    });
    // TODO: fix(security)
    // set cookie with these attributes: same-site

    // Now server components will have access to token
    // Question: should we encrypt token?
    const now = Math.floor(Date.now() / 1000);
    const maxAge = decoded.exp ? decoded.exp - now : undefined;
    res.cookies.set("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
    });
    return res;
  } catch (error) {
    // if (error.type === 'CredentialsSignin') {
    //   return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    // } else {
    //   NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
    // }
    return NextResponse.json({ error }, { status: 500 });
  }
}
