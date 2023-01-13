import { StyledLabel } from "../ProductForm/ProductForm.styled";
import { StyledForm } from "../ProductForm/ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

export default function EditForm() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/products/${id}`);
  const [isEditMode, setIsEditMode] = useState(false);

  async function handleEditSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const editData = Object.fromEntries(formData);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...editData, reviews: [] }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(data);
        mutate(data);

        event.target.reset();
      } else console.error(`Error: ${response.status}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <h2 id="edit-form-title">Edit your Changes</h2>
      <StyledForm
        onSubmit={(event) => handleEditSubmit(event)}
        aria-labelledby="edit-form-title"
      >
        <StyledLabel htmlFor="edit-name">
          <input id="edit-name" name="name" />
        </StyledLabel>
        <StyledLabel htmlFor="edit-description">
          <input id="edit-description" name="description" />
        </StyledLabel>
        <StyledLabel htmlFor="edit-price">
          <input id="edit-price" name="price" />
        </StyledLabel>
        <StyledLabel htmlFor="edit-currency">
          <select id="edit-currency" name="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </StyledLabel>
        <StyledButton type="submit">
          {isEditMode ? "Edit" : "Submit"}
        </StyledButton>
      </StyledForm>
    </section>
  );
}
