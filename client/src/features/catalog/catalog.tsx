import { Container } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { fetchProductsAsync, productselectors } from "./catalogslice";
import ProductList from "./ProductList";
export default function Catalog() {
    const products = useAppSelector(productselectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsloaded, status } = useAppSelector(state => state.catalog)

    useEffect(() => {
        if (!productsloaded) dispatch(fetchProductsAsync());
    }, [productsloaded, dispatch])

    if (status.includes('pending')) {
        return <LoadingComponent message="Loading Products ..." />
    }
    return (
        <>

            <Container sx={{ mt: 20 }} >
                <ProductList products={products} />
            </Container>
        </>

    )
}