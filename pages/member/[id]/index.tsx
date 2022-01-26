import React from "react";
import { useRouter } from "next/router";

const member = ({ member }: any) => {
  return (
    <div>
      <p>First Name: {member[0].f_name}</p>
      <p>Last Name: {member[0].surname}</p>
      <p>Other Name: {member[0].other_name}</p>
      <p>Date Of Birth: {member[0].dob}</p>
      <p>Gender: {member[0].gender}</p>
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`http://localhost:5000/members/${context.params.id}`);
  const member = await res.json();

  return {
    props: {
      member,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/members");
  const members = await res.json();

  const ids = members.map((member: any) => member.staff_id);

  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export default member;
