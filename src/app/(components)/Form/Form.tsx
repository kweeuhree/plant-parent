"use client";

import { useState } from "react";
// import { useRouter } from "next/router";
import { mutate } from "swr";
//import styles
import styles from './FormStyle.module.css';

interface FormData {
    name: string;
    email: string;
    password: string;
    avatar_url: string;
}

interface Error {
    name?: string;
    email?: string;
    password?: string;
}

type Props = {
  formId: string;
  userForm: FormData;
  forNewUser?: boolean;
};

const Form = ({ formId, userForm, forNewUser = true }: Props) => {
  // const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState<Error>({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<FormData>({
    name: userForm.name,
    email: userForm.email,
    password: userForm.password,
    avatar_url: userForm.avatar_url,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  // const putData = async (form: FormData) => {
  //   const { id } = router.query;

  //   try {
  //     const res = await fetch(`/api/users/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Accept: contentType,
  //         "Content-Type": contentType,
  //       },
  //       body: JSON.stringify(form),
  //     });

  //     // Throw error with status code in case Fetch API req failed
  //     if (!res.ok) {
  //       throw new Error(res.status.toString());
  //     }

  //     const { data } = await res.json();

  //     mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
  //     router.push("/");
  //   } catch (error) {
  //     setMessage("Failed to update User");
  //   }
  // };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      // router.push("/");
    } catch (error) {
      setMessage("Failed to add User");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    const value =
      target.id === "poddy_trained"
        ? (target as HTMLInputElement).checked
        : target.value;
    const id = target.id;

    setForm({
      ...form,
      [id]: value,
    });
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: Error = {};
    if (!form.name) err.name = "Name is required";
    if (!form.email) err.email = "Email is required";
    if (!form.password) err.password = "Password is required";
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewUser && postData(form);
    } else {
      setErrors( errs );
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength={20}
          id="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          maxLength={20}
          id="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          maxLength={30}
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="avatar_url">avatar</label>
        <input
          type="url"
          id="avatar_url"
          value={form.avatar_url}
          onChange={handleChange}
        />
       
        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;