import { authService } from "@/services/auth";
import { AuthJwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const result = await authService.getToken({ email, password });
    const token = result.data;
    const decoded = jwtDecode<AuthJwtPayload>(token);

    const res = NextResponse.json(token);
    // TODO: fix(security) set cookie with these attributes
    // httpOnly=true, secure=true if prod, same-site
    // max-age to follow the token. extract from token
    // TODO: create logout endpoint and remove cookie there

    // Now server components will have access to token
    // Question: should we encrypt token?
    const now = Math.floor(Date.now() / 1000);
    const maxAge = decoded.exp ? decoded.exp - now : undefined;
    res.cookies.set("token", token, {
      httpOnly: true,
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
