import { useEffect, useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import CreateProduct from "./createProduct";
import { ProductType } from "../types/productsType";
import { useDispatch } from "react-redux";
import { deleteProd } from "../features/products/productSlice";
import { AppDispatch } from "../app/store";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

type ModalType = "view" | "edit" | "delete" | "create" | null;
type ModalContent = ProductType | User | null;

function AdminView() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showProducts, setShowProducts] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [editableData, setEditableData] = useState<any>({});

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then(res => res.json())
      .then(data => setProducts(data.products));

    fetch("https://dummyjson.com/users?limit=5")
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  const openModal = (type: ModalType, content: ModalContent) => {
    setModalType(type);
    setModalContent(content);
    setEditableData(content || {});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setModalContent(null);
    setEditableData({});
  };

  const handleChange = (key: string, value: string | number) => {
    setEditableData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const { id, title, description, brand } = editableData;
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, brand }),
    })
      .then(res => res.json())
      .then(updatedProduct => {
        setProducts(prev =>
          prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      })
      .catch(error => {
        console.log(error);
      });

    closeModal();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-2 mt-20">
      <div>
        <button
          onClick={() => openModal("create", null)}
          className="p-3 bg-[#de5499] text-white rounded-md font-semibold shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90"
        >
          Add New Product
        </button>
      </div>
      {/* Products Table */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer bg-[#fceee9] border border-[#264143] p-4 rounded-xl"
          onClick={() => setShowProducts(prev => !prev)}
        >
          <h2 className="text-xl font-bold text-[#264143]">Products</h2>
          {showProducts ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showProducts && (
          <div className="overflow-x-auto mt-4 rounded-xl border border-[#264143] shadow-md">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-[#fceee9] text-[#264143]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p, i) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {p.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      ${p.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {p.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {p.brand}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 text-[14px]">
                        <button
                          onClick={() => openModal("view", p)}
                          title="View"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openModal("edit", p)}
                          title="Edit"
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => openModal("delete", p)}
                          title="Delete"
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer bg-[#fceee9] border border-[#264143] p-4 rounded-xl"
          onClick={() => setShowUsers(prev => !prev)}
        >
          <h2 className="text-xl font-bold text-[#264143]">Users</h2>
          {showUsers ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showUsers && (
          <div className="overflow-x-auto mt-4 rounded-xl border border-[#264143] shadow-md">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-[#fceee9] text-[#264143]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u, i) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {u.firstName} {u.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {u.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {u.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 text-[14px]">
                        <button
                          onClick={() => openModal("view", u)}
                          title="View"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openModal("edit", u)}
                          title="Edit"
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => openModal("delete", u)}
                          title="Delete"
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/2 bg-opacity-40 z-50 overflow-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg border border-[#264143] shadow-lg relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
              >
                &times;
              </button>

              <h2 className="text-xl font-bold text-[#264143] capitalize mb-4">
                {modalType}{" "}
                {modalType === "create"
                  ? "Product"
                  : modalContent && "title" in modalContent
                  ? "Product"
                  : "User"}
              </h2>

              <div className="space-y-3 text-sm">
                {modalType === "create" ? (
                  <CreateProduct
                    onClose={closeModal}
                    onAddProduct={newProduct => {
                      setProducts(prev => [newProduct, ...prev]);
                    }}
                    isModal
                  />
                ) : modalType === "edit" ? (
                  Object.entries(editableData).map(([key, value]) => {
                    if (
                      typeof value === "string" ||
                      typeof value === "number"
                    ) {
                      return (
                        <div key={key}>
                          <label className="capitalize text-sm font-medium text-[#264143]">
                            {key}
                          </label>
                          <input
                            className="w-full mt-1 border px-3 py-2 rounded-md text-gray-700"
                            value={value}
                            onChange={e => handleChange(key, e.target.value)}
                          />
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  modalContent &&
                  Object.entries(modalContent).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize font-medium">{key}:</span>
                      <span>{String(value)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 text-right space-x-2">
                {modalType === "edit" && (
                  <button
                    onClick={handleSave}
                    className="p-4 font-extrabold bg-[#de5499] rounded-md shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90 focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
                  >
                    Save
                  </button>
                )}
                {modalType === "delete" && (
                  <button
                    onClick={() => {
                      dispatch(deleteProd(editableData.id));
                      setProducts(prev =>
                        prev.filter(p => p.id !== editableData.id)
                      );
                      closeModal();
                    }}
                    className="p-4 w-[290px] text-[15px] font-extrabold bg-[#d7434a] rounded-md shadow-[3px_3px_0px_0px_#e99f4c] hover:opacity-90 focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#e99f4c]"
                  >
                    Confirm Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminView;
