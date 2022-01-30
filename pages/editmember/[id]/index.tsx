import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import AWS from "aws-sdk";
import styles from "/styles/Home.module.css";
import Head from "next/head";

const editmember: NextPage = ({ member }: any) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const [input, setInput] = useState({
    staff_id: member[0].staff_id,
    f_name: member[0].f_name,
    surname: member[0].surname,
    other_name: member[0].other_name,
    dob: member[0].dob,
    gender: member[0].gender,
    phone_1: member[0].phone_1,
    phone_2: member[0].phone_2,
    email: member[0].email,
    next_of_kin: member[0].next_of_kin,
    next_of_kin_phone: member[0].next_of_kin_phone,
    relationship: member[0].relationship,
    archived: "false",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateMember = async (event: any) => {
    event.preventDefault();
    const res = await fetch(
      `http://localhost:5000/update-member/${member[0].staff_id}`,
      {
        body: JSON.stringify({
          staff_id: member[0].staff_id,
          f_name: input.f_name,
          surname: input.surname,
          other_name: input.other_name,
          photo: photoUrl ? photoUrl : member[0].photo,
          dob: input.dob,
          gender: input.gender,
          phone_1: input.phone_1,
          phone_2: input.phone_2,
          email: input.email,
          next_of_kin: input.next_of_kin,
          next_of_kin_phone: input.next_of_kin_phone,
          relationship: input.relationship,
          archived: "false",
          status: "active",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );

    const result = await res.json();

    console.log(result);
  };

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEYID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  function addPhoto(albumName: string, file: any) {
    const files = file;
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }

    const newFile = files[0];
    const fileName = newFile.name;
    const albumPhotosKey = encodeURIComponent(albumName) + "/";

    const photoKey = albumPhotosKey + fileName;
    // Use S3 ManagedUpload class as it supports multipart uploads
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "eborileys3",
        Key: photoKey,
        Body: newFile,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert("Successfully uploaded photo.");
        console.log(data.Location);
        setPhotoUrl(data.Location);
      },
      function (err) {
        return alert("There was an error uploading your photo: " + err.message);
      }
    );
  }

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const fSize = event.target.files[0].size / 1024;
      if (fSize > 2048) {
        alert("Image size exceeds 2Mb");
        console.log(fSize);
      } else {
        let reader = new FileReader();
        reader.onload = () => {
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);

        addPhoto("creditunion", event.target.files);
      }
    }
  };
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container m-auto max-w-sm bg-white rounded-2xl p-2 my-2 shadow-xl shadow-xl shadow-2xl ">
        <h2 className="text-center text-xl">{"Edit Member's Info"}</h2>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          onChange={(e) => onImageChange(e)}
        />

        <img
          src={selectedFile ? selectedFile : member[0].photo}
          className="m-auto w-full h-86"
          alt="profile image"
          id="profile-photo"
        />
        <form onSubmit={updateMember} className="flex flex-col">
          <InputField
            fieldName="Staff ID"
            id="staff_id"
            name="staff_id"
            type="text"
            value={input.staff_id}
            onChange={handleChange}
            disabled={true}
          />

          <InputField
            fieldName="First Name"
            id="f_name"
            name="f_name"
            type="text"
            value={input.f_name}
            onChange={handleChange}
          />

          <InputField
            fieldName="Second Name"
            id="surnam"
            name="surname"
            type="text"
            value={input.surname}
            onChange={handleChange}
          />

          <InputField
            fieldName="Other Names"
            id="other_name"
            name="other_name"
            type="text"
            value={input.other_name}
            onChange={handleChange}
          />

          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            name="dob"
            type="date"
            className={`rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
            value={input.dob}
            onChange={handleChange}
          />

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className={`border-2 rounded-md ${styles.input}`}
          >
            <option value="">--Please choose an option--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <InputField
            fieldName="First Phone"
            id="phone_1"
            name="phone_1"
            type="text"
            value={input.phone_1}
            onChange={handleChange}
          />

          <InputField
            fieldName="Second Phone"
            id="phone_2"
            name="phone_2"
            type="text"
            value={input.phone_2}
            onChange={handleChange}
          />

          <InputField
            fieldName="Email"
            id="email"
            name="email"
            type="text"
            value={input.email}
            onChange={handleChange}
          />

          <InputField
            fieldName="Next of Kin"
            id="next_of_kin"
            name="next_of_kin"
            type="text"
            value={input.next_of_kin}
            onChange={handleChange}
          />

          <InputField
            fieldName="Next of Kin's phone"
            id="next_of_kin_phone"
            name="next_of_kin_phone"
            type="text"
            value={input.next_of_kin_phone}
            onChange={handleChange}
          />

          <InputField
            fieldName="Relationship to next of kin"
            id="relationship"
            name="relationship"
            type="text"
            value={input.relationship}
            onChange={handleChange}
          />

          <button
            type="submit"
            className={`bg-green-600 shadow-md text-white text-xl rounded-md py-3 mt-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
          >
            Save changes
          </button>
        </form>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(
    `http://localhost:5000/editmember/${context.params.id}`
  );
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

const InputField = (props: any) => {
  return (
    <div>
      <div className="flex flex-col">
        <label>{props.fieldName}</label>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          className={`rounded-md border border-green-400 outline-1 p-1.5 outline-green-700 ${styles.input}`}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default editmember;
