"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
//import styles
import styles from './FormStyle.module.css';

interface FormData {
    name: string;
    email: string;
    password: string 
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
  setState: (newState: any) => void;
};

const Form = ({ formId, userForm, setState, forNewUser = true }: Props) => {
  
  const contentType = "application/json";
  const [errors, setErrors] = useState<Error>({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState<FormData>({
    name: userForm.name,
    email: userForm.email,
    password: userForm.password
  });
  const router = useRouter();

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    console.log('attempting post request');
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      response.status === 409 &&
      setMessage("User with this email already exists");

      if(response.ok) {
        const userData = await response.json();
        setState({id: userData.id, loggedIn: true});
        //redirect to 'profile/allplants'
        router.push(`/profile/${userData.id}/all`);
      }

    } catch (error) {
      setMessage("Failed to add User");

    } finally {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

   

  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    const { value, id } = target;

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
      <form 
        id={formId} 
        onSubmit={handleSubmit} 
        className={styles.form}
        >
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