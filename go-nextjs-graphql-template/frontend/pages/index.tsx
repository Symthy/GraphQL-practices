import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { GetTodoDocument } from "../graphql/dist/client";
import { GetTodoQuery } from "../graphql/dist/client";

const Home: NextPage = () => {
  /* added start */
  const { data } = useQuery<GetTodoQuery>(GetTodoDocument);
  return (
    <div style={{ margin: "0 auto", width: "1000px" }}>
      {data?.todos?.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.text}</h1>
          <p>id:{todo.id}</p>
          <p>text:{todo.text}</p>
        </div>
      ))}
    </div>
  );
  /* added end */
};

export default Home;
