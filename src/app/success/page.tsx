import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function page({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <main className={styles.main}>
        <h1>決済情報が見つかりません。</h1>
        <Link href="/">トップページへ戻る</Link>
      </main>
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const isPaid = session.payment_status === "paid";

    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <p className={styles.label}>Oreder Completed</p>
          <h1>
            {isPaid ? "ご購入ありがとうございます" : "決済を確認しています"}
          </h1>

          {session.amount_total !== null && (
            <p className={styles.amount}>
              お支払い金額: ¥{session.amount_total.toLocaleString("ja-JP")}
            </p>
          )}

          {session.customer_details?.email && (
            <p className={styles.email}>
              確認先:
              {session.customer_details.email}
            </p>
          )}

          <Link href="/" className={styles.link}>
            商品一覧に戻る
          </Link>
        </div>
      </main>
    );
  } catch {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <h1>決済情報を確認できませんでした</h1>
          <Link href="/" className={styles.link}>
            商品一覧に戻る
          </Link>
        </div>
      </main>
    );
  }
}
