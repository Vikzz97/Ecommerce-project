import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState('')
    // handle form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created`)
                getAllCategories();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('somehing went wrong in input form')
        }
    }

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            if (data.success) {
                setCategories(data.category)

            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    };

    useEffect(() => {
        getAllCategories();
    }, [])

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName('')
                setOpen(false)
                getAllCategories();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    };

    // Delete category
    const handleDelete = async (pId) => {

        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`);
            if (data.success) {
                toast.success(`${name} is deleted`)
                getAllCategories();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    };

    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2>Manage Category</h2>
                        <div className="w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {categories.map((c) => (
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        setOpen(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);
                                                    }} className="btn btn-primary ms-2">Edit</button>
                                                    <button onClick={() => { handleDelete(c._id) }} className="btn btn-danger ms-2">Delete</button>
                                                </td>
                                            </tr>

                                        ))}
                                    </>
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            onCancel={() => setOpen(false)}
                            footer={null}
                            open={open}
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                                
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default CreateCategory;