import { Grid } from "@mui/material";
import { Product } from "../../App/Models/Product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[]
}
export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4} >
            {products?.map(
                (product) =>
                (
                    <Grid item lg={4} xs={4} sm={4} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))
            }
        </Grid>)
}