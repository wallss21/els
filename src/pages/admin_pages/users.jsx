import React, { useEffect } from "react";
import { GoDotFill, GoTrash } from "react-icons/go";
import { IoClose, IoPencilOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetch_all_users } from "../../features/admin/adminSlice";
import { Button } from "rsuite";

const User = ({ user, index }) => {
  return (
    <tr
      className={`${
        index % 2
          ? "bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
          : ""
      }  border-b `}
    >
      <td className="whitespace-nowrap px-6 py-4">{user.first_name}</td>
      <td className="whitespace-nowrap px-6 py-4">{user.last_name}</td>
      <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
      <td className="whitespace-nowrap px-6 py-4">{user.registered_at}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {user.is_active ? <GoDotFill color="green" /> : <IoClose color="red" />}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{user.last_login}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex gap-x-4">
          <Button>
            <IoPencilOutline />
          </Button>
          <Button className="">
            <GoTrash className="text-red-700" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

function Users() {
  const users = useSelector((state) => state.admin.all_users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_all_users());
  }, [dispatch]);
  return (
    <section className="p-7 bg-slate-50 rounded-xl overflow-x-hidden ">
      <div class="flex flex-col overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table class="min-w-ful text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      First
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Last
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Registered At
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Is Active
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Last Login
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <User user={user} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Users;
