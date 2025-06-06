import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from 'antd'
import e from "cors";
import { useNavigate } from "react-router-dom";
const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [shipping, setShipping] = useState("")
    const [quantity, setQuantity] = useState("")
    const [photo, setPhoto] = useState("")

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category)

            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])

    //HANDLE PRODUCT
    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)

            const { data } = await axios.post('/api/v1/product/create-product', productData);
            if (data?.success) {
                toast.success("Product created successfully")
                navigate("/dashboard/admin/products")

            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2>Create Product</h2>
                        <form onSubmit={handleCreate}>
                            <div className="m-1 w-75">
                                <Select variant={false} placeholder="Select a category" size="large" showSearch className="form-select mb-3" onChange={(value) => { setCategory(value) }} >
                                    {categories?.map(c => (
                                        <Option key={c._id} value={c._id} > {c.name} </Option>
                                    ))}
                                </Select>
                                <div className="mb-3">
                                    <label className="btn btn-outline-secondary col-md-12">
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                <div className="mb-3" >
                                    {photo && (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="product_photo" height={`200px`} />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input type="text"
                                        value={name}
                                        placeholder="write name here"
                                        className="form-control" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <textarea type="text"
                                        value={description}
                                        placeholder="write a description"
                                        className="form-control" onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <input type="number"
                                        value={price}
                                        placeholder="write a price"
                                        className="form-control" onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="number"
                                        value={quantity}
                                        placeholder="write quantity here"
                                        className="form-control" onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <Select
                                        variant={false}
                                        placeholder="Select Shipping "
                                        size="large"
                                        showSearch
                                        className="form-select mb-3"
                                        onChange={(value) => {
                                            setShipping(value);
                                        }}
                                    >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary"
                                        onClick={handleCreate}>
                                        CREATE PRODUCT
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default CreateProduct;