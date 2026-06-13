import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getProducts } from '../../api/productApi';
import ProductForm from '../../components/ProductForm';

const ProductList = () => {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const response =
                await getProducts();

            setProducts(response.data);

        } catch (error) {

            toast.error(
                'Failed To Load Products'
            );

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-5">
                Products
            </h1>

            <ProductForm
                onSuccess={() => {
                    toast.success(
                        'Product Saved Successfully'
                    );

                    loadProducts();
                }}
            />

            {
                loading && (
                    <div className="text-center p-4 text-blue-600 font-semibold">
                        Loading Products...
                    </div>
                )
            }

            <table className="w-full bg-white shadow">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="p-3">
                            Product
                        </th>

                        <th className="p-3">
                            Price
                        </th>

                        <th className="p-3">
                            Stock
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {products.map(product => (

                        <tr
                            key={product.id}
                            className="border-b"
                        >

                            <td className="p-3">
                                {product.product_name}
                            </td>

                            <td className="p-3">
                                ₹{product.price}
                            </td>

                            <td
                                className={`p-3 font-semibold ${
                                    product.stock_quantity <= 20
                                        ? 'text-red-600'
                                        : product.stock_quantity <= 50
                                        ? 'text-orange-500'
                                        : 'text-green-600'
                                }`}
                            >
                                {product.stock_quantity}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default ProductList;