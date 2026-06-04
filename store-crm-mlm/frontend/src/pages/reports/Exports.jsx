import api from '../../api/api';

const Exports = () => {

    const downloadFile = async (
        endpoint,
        filename
    ) => {

        try {

            const response =
                await api.get(
                    endpoint,
                    {
                        responseType: 'blob'
                    }
                );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement('a');

            link.href = url;

            link.setAttribute(
                'download',
                filename
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.error(error);

            alert(
                'Export Failed'
            );
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Export Reports
            </h1>

            <div className="grid grid-cols-3 gap-4">

                <button
                    onClick={() =>
                        downloadFile(
                            '/export/customers',
                            'customers.xlsx'
                        )
                    }
                    className="bg-blue-600 text-white p-4 rounded"
                >
                    Export Customers
                </button>

                <button
                    onClick={() =>
                        downloadFile(
                            '/export/sales',
                            'sales.xlsx'
                        )
                    }
                    className="bg-green-600 text-white p-4 rounded"
                >
                    Export Sales
                </button>

                <button
                    onClick={() =>
                        downloadFile(
                            '/export/commissions',
                            'commissions.xlsx'
                        )
                    }
                    className="bg-purple-600 text-white p-4 rounded"
                >
                    Export Commissions
                </button>

            </div>

        </div>
    );
};

export default Exports;