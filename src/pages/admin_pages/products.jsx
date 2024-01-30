import React, { useEffect } from "react";
import { GoDotFill, GoTrash } from "react-icons/go";
import { IoClose, IoPencilOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Button } from "rsuite";
import { fetch_all_products } from "../../features/admin/adminSlice";

const Product = ({ product }) => {
  return (
    <tr className={`${""}  border-b `}>
      <td className="whitespace-nowrap px-6 py-4">
        <img src={product.img} alt="" />
      </td>
      <td className="whitespace-nowrap px-6 py-4">{product.img}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.main_category}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.category}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.count}</td>
      <td className="whitespace-nowrap px-6 py-4">
        {product.active ? <GoDotFill color="green" /> : <IoClose color="red" />}
      </td>
      <td className="whitespace-nowrap px-6 py-4">{product.last_login}</td>
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

function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_all_products());
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
                      Product Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Main Category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Sub Category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pieces
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
