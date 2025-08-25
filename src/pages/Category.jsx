import React, { useEffect, useState } from 'react';
import Dashboard from "../component/Dashboard.jsx";
import { useUser } from '../hook/useUser.jsx';
import { Plus } from 'lucide-react';
import { axiosConfig } from '../util/axiosConfig.js';
import { API_ENDPOINTS } from '../util/apiEndpoints.js';
import toast from 'react-hot-toast';
import CategoryList from '../component/CategoryList.jsx';
import Modal from '../component/Modal.jsx';
import AddCategoryForm from '../component/AddCategoryForm.jsx';

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState(false);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if(loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200) {
                setCategoryData(response.data);
                
            }   
       
        } catch (error) {
            console.error('Error fetching category details:Something went wrong. Please try again.', error);
            toast.error(error.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const {name, type, icon} = category;
        if(!name.trim()){
            toast.error("Category name is required.");
            return;
        }

        //check if category already exists
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if(isDuplicate) {
            toast.error("Category already exists.");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            if(response.status === 201) {
                toast.success("Category added successfully.");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error(error?.response?.data?.message || 'Failed to add Category.');
        }
    }

    const handleEditCategory = (categoryToEdit) => {
       setSelectedCategory(categoryToEdit);
       setOpenEditCategoryModal(true);
       
    }

    const handleUpdateCategory =  async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if(!name.trim()){
            toast.error("Category name is required.");
            return;
        }

        if(!id) {
            toast.error("Category ID is missing for the Update.");    
            return;
        }

        //check if category already exists
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase() && category.id !== selectedCategory.id;
        })

        if(isDuplicate) {
            toast.error("Category already exists.");
            return;
        }

        try{
            const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            if(response.status === 200) {
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);
                toast.success("Category updated successfully.");
                fetchCategoryDetails();
            }
        }
        catch(error){
            console.error('Error updating category:', error);
            toast.error(error?.response?.data?.message || 'Failed to update Category.');
        };
    }

    return (
        <Dashboard activeMenu="Category">
           <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <h2 className='text-2xl font-semibold'>All Categories</h2>
                    <button
                    onClick={() => setOpenAddCategoryModal(true)}
                    className='text-blue-700 bg-blue-100 font-medium hover:bg-blue-800 py-1 px-2 rounded hover:text-white flex items-center gap-1'>
                        <Plus size={15} /> Add Category
                    </button>
                </div>

                {/* category list */}
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>
                {/* category modal  */}
                <Modal title="Add Category" isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)}>
                <AddCategoryForm onAddCategory={handleAddCategory}  />
                </Modal>
                {/* Updating Category Modal */}
                <Modal isOpen={openEditCategoryModal} onClose={() => {setOpenEditCategoryModal(false); setSelectedCategory(null)}} title="Update Category">
                    <AddCategoryForm onAddCategory={handleUpdateCategory} isEditing={true} initialCategoryData={selectedCategory} />
                </Modal>
           </div>
        </Dashboard>
    );
};

export default Category;