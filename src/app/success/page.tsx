import React from "react";
import styles from "./page.module.scss";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function page({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p className={styles.label}>Oreder Completed</p>
      </div>
    </main>
  );
}
