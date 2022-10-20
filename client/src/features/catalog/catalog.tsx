import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";
export default function Catalog() {
    const [products, setproducts] = useState<Product[]>([])

    useEffect(() => {
        fetch
            ("https://localhost:7070/Products")
            .then(response => response.json())

            .then(data => setproducts(data))
    }, [])
    return (
        <>
            <Container sx={{ mt: 20 }} >
                <ProductList products={products} />
            </Container>
        </>

    )
}