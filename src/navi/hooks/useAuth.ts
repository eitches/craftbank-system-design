"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { path } from "../path";

export function useAuth() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");
  const invitationKey = searchParams?.get("key");
  const { status } = useSession();

  // 招待フロー開始時の自動セッションクリア
  useEffect(() => {
    if (invitationKey && status === "authenticated") {
      const performSignOut = async () => {
        try {
          await signOut({ redirect: false });
        } catch (error) {
          console.error("Sign-out failed during invitation flow:", error);
        }
      };
      performSignOut();
    }
  }, [invitationKey, status]);

  const getCallbackUrl = () => {
    // NextAuth.jsのcallbackUrlパラメータを優先
    // ミドルウェアが設定した認証後リダイレクト先を正しく取得するため
    const callbackUrl = searchParams?.get("callbackUrl");
    if (callbackUrl) {
      return callbackUrl;
    }

    // redirectToパラメータが存在する場合はそれを使用
    if (redirectTo) {
      return redirectTo;
    }

    // 従来のkeyパラメータによる招待フロー（後方互換性のため）
    return invitationKey
      ? `/enterprise/invitation/accept?token=${invitationKey}`
      : path.user.top();
  };

  const signInWithGoogle = async () => {
    const callbackUrl = getCallbackUrl();
    await signIn("google", { callbackUrl });
  };

  const signInWithMicrosoft = async () => {
    const callbackUrl = getCallbackUrl();
    await signIn("microsoft-entra-id", { callbackUrl });
  };

  const signInWithEmail = async (email: string) => {
    const callbackUrl = getCallbackUrl();
    await signIn("sendgrid", { email, callbackUrl });
  };

  return {
    invitationKey,
    signInWithGoogle,
    signInWithMicrosoft,
    signInWithEmail,
  };
}
