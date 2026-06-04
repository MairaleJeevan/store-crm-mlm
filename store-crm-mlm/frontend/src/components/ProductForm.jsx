import { useState } from 'react';
import { createProduct } from '../api/productApi';

const ProductForm = ({ onSuccess }) => {

    const [form, setForm] = useState({
        product_name: '',
        product_code: '',
        category: '',
        purchase_price: '',
        selling_price: '',
        stock_quantity: '',
        min_stock: '',
        description: ''
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createProduct(form);

            alert('Product Added Successfully');

            setForm({
                product_name: '',
                product_code: '',
                category: '',
                purchase_price: '',
                selling_price: '',
                stock_quantity: '',
                min_stock: '',
                description: ''
            });

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {

            console.log(
                'PRODUCT ERROR:',
                error?.response?.data
            );

            alert(
                error?.response?.data?.message ||
                'Failed'
            );
        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded shadow mb-6"
        >

            <h2 className="text-xl font-bold mb-4">
                Add Product
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <input
                    name="product_name"
                    placeholder="Product Name"
                    value={form.product_name}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="product_code"
                    placeholder="Product Code"
                    value={form.product_code}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="purchase_price"
                    placeholder="Purchase Price"
                    value={form.purchase_price}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="selling_price"
                    placeholder="Selling Price"
                    value={form.selling_price}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="stock_quantity"
                    placeholder="Stock Quantity"
                    value={form.stock_quantity}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="min_stock"
                    placeholder="Minimum Stock"
                    value={form.min_stock}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2"
                />

            </div>

            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Save Product
            </button>

        </form>
    );
};

export default ProductForm;