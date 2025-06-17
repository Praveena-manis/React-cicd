import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Products() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  // use name, not value as key
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      formData.append(key, val);
    });
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/user/addproduct', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Product Added');
      setProducts(prev => [res.data.product, ...prev]);

      // Clear form
      setForm({ title: '', description: '', price: '', quantity: '' });
      setImage(null);
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <h3 className="p-5 text-center">Add Products</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={form.title} required /> <br /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} /> <br /><br />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={form.price} required /> <br /><br />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} value={form.quantity} required /> <br /><br />
        <input type="file" accept="image/*" onChange={handleImageChange} required /> <br /><br />
        <button type="submit">Submit</button>
      </form>

      <div className="row mt-4">
        {products.map(product => (
          <div className="col-lg-4" key={product._id}>
            <img src={product.imageUrl} alt={product.title} width="100%" />
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <h5>Only at ${product.price}</h5>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
