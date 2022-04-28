import { NextPage } from "next";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import styles from "/styles/Home.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import { url } from "../../../config/url";
import { getSession, signIn } from "next-auth/react";

const Editmember: NextPage = ({ member }: any) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [activeDelBtn, setActiveDelBtn] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
    archived: member[0].archived,
    status: member[0].status,
    institution: member[0].institution,
    password: member[0].password,
    type: member[0].type,
    beneficiary_1: member[0].beneficiary_1,
    beneficiary_2: member[0].beneficiary_2,
    beneficiary_3: member[0].beneficiary_3,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteMember = (event: any) => {
    event.preventDefault();
    if (event.target.value === member[0].staff_id) {
      return setActiveDelBtn(false);
    }
    return setActiveDelBtn(true);
  };

  const updateMember = async (event: any) => {
    event.preventDefault();
    const res = await fetch(`${url}/update-member/${member[0].staff_id}`, {
      body: JSON.stringify({
        staff_id: input.staff_id ? input.staff_id : member[0].staff_id,
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
        archived: input.status === "active" ? "false" : "true",
        status: input.status,
        institution: input.institution,
        password: input.password,
        type: input.type,
        beneficiary_1: input.beneficiary_1,
        beneficiary_2: input.beneficiary_2,
        beneficiary_3: input.beneficiary_3,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    const result = await res.json();

    console.log(result);
  };

  const deleteMember = async () => {
    const res = await fetch(`${url}/remove-member/${member[0].staff_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    const result = await res.json();
    if (result === "Member deleted successfully") {
      router.push("/member");
    }
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
        let reader: any = new FileReader();
        reader.onload = () => {
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);

        addPhoto("creditunion", event.target.files);
      }
    }
  };

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div className="container m-auto bg-slate-100 mt-2 mb-2 w-full rounded-2xl p-2 shadow-xl ">
        <h2 className="text-center text-xl">{"Edit Member's Info"}</h2>
        <form className="">
          <div className="flex flex-col sm:flex-row">
            <div className="mr-5 w-auto bg-white rounded-xl h-fit my-2 p-2">
              <img
                src={selectedFile ? selectedFile : member[0].photo}
                className="w-full"
                alt="profile image"
                id="profile-photo"
              />

              <input
                className="mt-2"
                type="file"
                accept="image/*"
                name="image"
                id="file"
                onChange={(e) => onImageChange(e)}
              />
            </div>
            <div className=" mr-5 w-auto bg-white rounded-xl h-fit my-2 p-2">
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

              <div className="flex flex-col">
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
              </div>
            </div>

            <div className="w-auto mr-5 bg-white rounded-xl h-fit my-2 p-2">
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

              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                className={`border-2 block rounded-md ${styles.input}`}
                value={input.status}
                onChange={handleChange}
              >
                <option value="active">--Please choose an option--</option>
                <option value="retired">Retired</option>
                <option value="terminated">Terminated</option>
                <option value="deceased">Deceased</option>
              </select>

              <InputField
                fieldName="Name of Institution"
                id="institution"
                name="institution"
                type="text"
                value={input.institution}
                onChange={handleChange}
              />

              <button
                onClick={updateMember}
                className={`bg-green-600 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 transition duration-700 hover:bg-green-500 hover:font-medium`}
              >
                Save changes
              </button>
            </div>

            <div className=" mt-2 w-auto bg-white rounded-xl my-2 p-2 h-fit sm:mt-0">
              <div className="w-auto">
                <InputField
                  fieldName={"Password"}
                  id={"password"}
                  name={"password"}
                  type={"password"}
                  value={input.password}
                  onChange={handleChange}
                  disabled={true}
                />

                <InputField
                  fieldName="Beneficiary 1"
                  id="beneficiary_1"
                  name="beneficiary_1"
                  type="text"
                  value={input.beneficiary_1}
                  onChange={handleChange}
                />

                <InputField
                  fieldName="Beneficiary 2"
                  id="beneficiary_2"
                  name="beneficiary_2"
                  type="text"
                  value={input.beneficiary_2}
                  onChange={handleChange}
                />

                <InputField
                  fieldName="Beneficiary 3"
                  id="beneficiary_3"
                  name="beneficiary_3"
                  type="text"
                  value={input.beneficiary_3}
                  onChange={handleChange}
                />

                <label htmlFor="type">Type of member</label>
                <select
                  id="type"
                  name="type"
                  className={`block border-2 rounded-md ${styles.input}`}
                  value={input.type}
                  onChange={handleChange}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <p>Enter the staff ID {member[0].staff_id} to confirm delete</p>
                <InputField
                  id="institution"
                  name="institution"
                  type="text"
                  onChange={handleDeleteMember}
                  placeholder={`${member[0].staff_id}`}
                />

                <button
                  onClick={deleteMember}
                  className={
                    activeDelBtn
                      ? "bg-red-300 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 cursor-pointer"
                      : "bg-red-600 w-full shadow-md text-white text-xl rounded-md py-3 mt-3 cursor-pointer"
                  }
                  disabled={activeDelBtn}
                >
                  Delete Member
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await fetch(`${url}/editmember/${context.params.id}`);
  const member = await res.json();

  return {
    props: {
      member,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${url}/members`);
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
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default Editmember;
