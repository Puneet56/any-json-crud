import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Table from "../components/crud-table";

const Home = <T extends {}>({ data = [] }: { data: T[] }) => {
  return (
    <div className="flex min-h-screen bg-gray-800 flex-col items-center justify-start py-2">
      <Head>
        <title>Any JSON CRUD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Table {...{ data }} />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const API_URL = "https://jsonplaceholder.typicode.com";

  let users = [];

  try {
    const data = await axios.get(`${API_URL}/posts`);
    users = data.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(users)),
    },
  };
};
