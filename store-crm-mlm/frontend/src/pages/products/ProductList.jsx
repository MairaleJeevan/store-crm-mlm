import { useEffect, useState } from 'react';
import { getProducts } from '../../api/productApi';
import ProductForm from '../../components/ProductForm';

const ProductList = () => {

    const [products, setProducts] =
        useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const response =
                await getProducts();

            setProducts(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-5">
                Products
            </h1>

            <ProductForm
                onSuccess={loadProducts}
            />

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

                            <td className="p-3">
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