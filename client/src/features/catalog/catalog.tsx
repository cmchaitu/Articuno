import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";
export default function Catalog() {
    const [products, setproducts] = useState<Product[]>([])

    useEffect(() => {
        agent.catalog.list().then(data => setproducts(data))
    }, [])
    return (
        <>

            <Container sx={{ mt: 20 }} >
                <ProductList products={products} />
            </Container>
        </>

    )
}