import { useRef } from "react";

import classes from "./newsletter-registration.module.css";

export interface NewsLetterRegistrationProps {}

export default function NewsLetterRegistration({}: NewsLetterRegistrationProps) {
  const emailInputRef = useRef<HTMLInputElement>(null);

  function registrationHandler(e: React.FormEvent) {
    e.preventDefault();

    const enteredInputRef = emailInputRef.current?.value;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredInputRef }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}