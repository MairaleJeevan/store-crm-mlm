import { useEffect, useState } from 'react';
import { getLowStockProducts } from '../../api/productApi';

const LowStock = () => {

    const [products, setProducts] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const response =
                await getLowStockProducts();

            setProducts(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Low Stock Products
            </h1>

            <table className="w-full bg-white shadow">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-3">
                            Product
                        </th>

                        <th className="p-3">
                            Current Stock
                        </th>

                        <th className="p-3">
                            Minimum Stock
                        </th>

                        <th className="p-3">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {products.map(product => (

                        <tr key={product.id}>

                            <td className="p-3">
                                {product.product_name}
                            </td>

                            <td className="p-3">
                                {product.stock_quantity}
                            </td>

                            <td className="p-3">
                                {product.min_stock}
                            </td>

                            <td className="p-3 text-red-600 font-bold">
                                LOW STOCK
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default LowStock;