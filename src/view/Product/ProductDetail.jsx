import React from "react"
import Axios from "axios"
import "./ProductDetail.css"

const API_URL = "http://localhost:8080"

class ProductDetail extends React.Component {
    state = {
        arrProduct: {
            productName: "",
            price: 0,
            image: ""
        },
        listProduct: [],
        selectedFile: null,
        arrEditProduct: {
            id: 0,
            productName: "",
            price: 0,
            image: ""
        },
    }

    FileChangeHandler = (e) =>{
        this.setState({selectedFile : e.target.files[0]})
    }

    ShowProductHandler = () => {
        Axios.get(`${API_URL}/productsWeekendTask`)
            .then(res => {
                console.log(res.data)
                this.setState({ arrProduct: res.data })
                this.setState({ listProduct: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    InputProductHandler = (e, key) => {
        const { value } = e.target
        this.setState({
            arrProduct: {
                ...this.state.arrProduct,
                [key]: value
            }
        })
    }

    EditInputProductHandler = (e, key) => {
        const { value } = e.target
        this.setState({
            arrEditProduct: {
                ...this.state.arrEditProduct,
                [key]: value
            }
        })
    }

    AddProductHandler = () => {
        const { productName, price } = this.state.arrProduct
        Axios.post(`${API_URL}/productsWeekendTask`, {
            productName: productName,
            price: price
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    DeleteProductHandler = (id) =>{
        Axios.delete(`${API_URL}/productsWeekendTask/${id}`)
        .then(res => {
            alert("Data Berhasil Dihapus")
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    EditProductHandler = (idx) =>{
        this.setState({
            arrEditProduct :{
                ...this.state.arrProduct[idx]
            }
        })
        console.log(this.state.arrEditProduct)
    }

    SaveProductHandler = () =>{
        Axios.put(`${API_URL}/productsWeekendTask/edit`,this.state.arrEditProduct)
        .then(res =>{
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    ShowAllProductHandler = () => {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Image</td>
                            <td>Action</td>

                        </tr>
                    </thead>
                    {this.state.listProduct.map((val, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{val.productName}</td>
                                    <td>{val.price}</td>
                                    <td>{val.image}</td>
                                    <td>
                                        <button onClick = {() => this.DeleteProductHandler(val.id)}>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick = {() => this.EditProductHandler(index)} >Edit</button>
                                    </td>
                                </tr>
                            </tbody>

                        )
                    })}
                </table>
            </div>
        )
    }



    render() {
        return (
            <div>
                <h1>ini ProductDetail</h1>
                <h1>Add Product</h1>
                <input type="text" placeholder="Product Name" onChange={(e) => this.InputProductHandler(e, "productName")} />
                <br />
                <input type="text" placeholder="Price" onChange={(e) => this.InputProductHandler(e, "price")} />
                <br />
                <input type="file" onChange={this.FileChangeHandler} />
                <br/>
                <button onClick={this.AddProductHandler}>Add Product</button>
                <h1>Show Product</h1>
                <button onClick={this.ShowProductHandler}>Click Me</button>
                {this.ShowAllProductHandler()}
                <h1>Edit Product</h1>
                <input type="text" value = {this.state.arrEditProduct.productName} placeholder="Product Name" onChange={(e) => this.EditInputProductHandler(e, "productName")} />
                <br />
                <input type="text" value = {this.state.arrEditProduct.price} placeholder="Price" onChange={(e) => this.EditInputProductHandler(e, "price")} />
                <br />
                <button onClick = {this.SaveProductHandler}>Save Product</button>
            </div>
        )
    }
}

export default ProductDetail