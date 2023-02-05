import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import uuid from "react-uuid";

import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { db, storage } from "../firebase/config";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Admin() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("");
  const [productsInfo, setProductsInfo] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const { user } = UserAuth();

  const addToImage = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  console.log(selectedFile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(selectedFile);

    await addDoc(collection(db, "category"), {
      id: uuid(),
      category: category,
      timestamp: serverTimestamp(),
    });

    const docRef = await addDoc(collection(db, "products"), {
      id: user.uid,
      title: productsInfo.title,
      price: productsInfo.price,
      description: productsInfo.description,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `images/${docRef.id}`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "products", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setProductsInfo({
      title: "",
      price: "",
      description: "",
    });
    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className=" m-auto">
        <div className="">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit} className="">
              <div className="shadow sm:rounded-md sm:overflow-hidden ">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <div className="">
                        <label
                          htmlFor="product_name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="product_name"
                          id="product_name"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-black"
                          onChange={(e) => {
                            setProductsInfo({
                              ...productsInfo,
                              title: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-black rounded-md"
                        onChange={(e) => {
                          setProductsInfo({
                            ...productsInfo,
                            description: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your product
                    </p>
                  </div>

                  <label
                    htmlFor="cost"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cost
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-[%20] rounded-none rounded-r-md sm:text-sm border border-black"
                      min={0}
                      id="cost"
                      name="cost"
                      onChange={(e) => {
                        setProductsInfo({
                          ...productsInfo,
                          price: e.target.value,
                        });
                      }}
                    />
                  </div>

                  {selectedFile ? (
                    <div className="relative">
                      <div
                        className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                      >
                        <GrClose className="text-white" />
                      </div>
                      <img
                        src={selectedFile}
                        alt=""
                        className="rounded-2xl max-h-80 object-contain"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="True"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={addToImage}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
