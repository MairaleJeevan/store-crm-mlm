import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMLMTree } from '../../api/mlmApi';

const MLMTree = () => {

    const { user } = useAuth();

    const [tree, setTree] =
        useState([]);

    useEffect(() => {

        loadTree();

    }, []);

    const loadTree = async () => {

        try {

            const response =
                await getMLMTree(user.id);

            setTree(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const renderTree = (nodes) => {

        return (
            <ul className="ml-6 mt-2">

                {nodes.map(node => (

                    <li
                        key={node.id}
                        className="mb-2"
                    >

                        <div className="bg-white p-3 rounded shadow">

                            <strong>
                                {node.full_name}
                            </strong>

                            <p>
                                {node.email}
                            </p>

                            <p>
                                Referral:
                                {' '}
                                {node.referral_code}
                            </p>

                            <p>
                                Level:
                                {' '}
                                {node.level}
                            </p>

                        </div>

                        {node.downlines &&
                            node.downlines.length > 0 &&
                            renderTree(
                                node.downlines
                            )}

                    </li>

                ))}

            </ul>
        );
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                MLM Team Tree
            </h1>

            {renderTree(tree)}

        </div>
    );
};

export default MLMTree;