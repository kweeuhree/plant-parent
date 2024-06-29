import connectToDb from '../lib/connectToDb';
import User, { Users } from "../models/User";
import { GetServerSideProps } from "next";

type Props = {
   users: Users[];
  };
  
  const Index = ({ users }: Props) => {
    return (
      <>
        {users.map((user, index) => (
          <div key={index}>
            <div className="card">
              <img src={user.avatar_url} />
              <h5 className="pet-name">{user.name}</h5>
              <div className="main-content">
                <p className="pet-name">{user.name}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await connectToDb();
  
    /* find all the data in our database */
    const result = await User.find({});
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const users = result.map((doc) => {
      const user = JSON.parse(JSON.stringify(doc));
      return user;
    });
  
    return { props: { users: users } };
  };

  export default Index;