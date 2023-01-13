import useSWR from "swr";
import { useRouter } from "next/router";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";
import Comments from "../Comments";
import EditForm from "../EditForm";
import { useState } from "react";

export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id ? `/api/products/${id}` : null);

  if (!data) {
    return <h1>Loading...</h1>;
  }
  async function handleDelete() {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      router.push(`/`);
    } catch (error) {
      console.error(error.message);
    }
  }
  // async function handleEdit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const editData = Object.fromEntries(formData);
  // }

  try {
  } catch (error) {
    console.error(error.message);
  }

  return (
    <ProductCard>
      <span>ID: {data._id}</span>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews && data.reviews.length > 0 && (
        <Comments reviews={data.reviews} />
      )}
      <StyledButton type="button">
        <span
          role="img"
          alt="A pencil"
          onClick={() => setIsEditMode(!isEditMode)}
          disabled={isEditMode}
        >
          ✏️
        </span>
      </StyledButton>
      <StyledButton type="delete" onClick={handleDelete}>
        <span role="img" alt="A cross indicating deletion">
          ❌
        </span>
      </StyledButton>
      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>
      {isEditMode && <EditForm isEditMode={isEditMode} />}
    </ProductCard>
  );
}
