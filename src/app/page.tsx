"use client";

import { useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
// for seamless transition between pages, instead of anchor use Link to navigate   
import Link from 'next/link';
// import { useRouter } from "next/router";
import Form from "./(components)/Form/Form";
import { PiPlantDuotone } from "react-icons/pi";

interface UserState {
  userId: string | null;
  loggedIn: boolean;
}

const userForm = {
  name: "",
  email: "",
  password: "",
  avatar_url: "",
}

export default function Home() {
  const [ userState, setUserState ] = useState<UserState>({
      userId: null,
      loggedIn: false
  })
  // const router = useRouter();
  // const { userId } = router.query;

  const handleSettingUserState = (newState: any) => {
    setUserState((prevUserState) => ({
      ...prevUserState,
      ...newState
    }));
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          hello&nbsp;
          <code className={styles.code}>plant parent</code>
        </p>
        <div>
          <PiPlantDuotone />
        </div>
      </div>

      <div className={styles.center}>
        <Form formId="user-form" userForm={userForm} forNewUser={true} setState={handleSettingUserState} />
      </div>

    </main>
  );
}
