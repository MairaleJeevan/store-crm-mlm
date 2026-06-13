import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMLMTree } from '../../api/mlmApi';

const MLMNode = ({ member }) => {
    return (
        <div className="ml-6 mt-2">
            <div className="bg-white shadow p-3 rounded border">
                <h3 className="font-bold">
                    {member.full_name}
                </h3>

                <p>
                    {member.email}
                </p>

                <p>
                    Referral:
                    {' '}
                    {member.referral_code}
                </p>

                <p>
                    Level:
                    {' '}
                    {member.level}
                </p>
            </div>

            {member.downlines?.length > 0 &&
                member.downlines.map(child => (
                    <MLMNode
                        key={child.id}
                        member={child}
                    />
                ))
            }
        </div>
    );
};

const MLMTree = () => {

    const { user } = useAuth();

    const [tree, setTree] =
        useState([]);

    useEffect(() => {

        if (user?.id) {
            loadTree();
        }

    }, [user]);

    const loadTree = async () => {

        try {

            const response =
                await getMLMTree(user.id);

            setTree(
                response.data.data || []
            );

        } catch (error) {

            console.error(
                'MLM Tree Error:',
                error
            );
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                MLM Team Tree
            </h1>

            {
                tree.length > 0 ? (
                    tree.map(member => (
                        <MLMNode
                            key={member.id}
                            member={member}
                        />
                    ))
                ) : (
                    <div className="bg-white p-4 rounded shadow">
                        No Downlines Found
                    </div>
                )
            }

        </div>
    );
};

export default MLMTree;