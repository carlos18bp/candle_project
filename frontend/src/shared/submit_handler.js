import Swal from "sweetalert2";
import { useReviewStore } from "@/stores/review";

/**
 * Show a success message for create or edit request.
 * @param {object} formData - form data to create or edit a record.
 * @param {string} text_response - text success message.
 * @param {string} redirectUrl - Redirect endpoint.
 */
export async function submitHandler(formData, text_response) {
  const reviewStore = useReviewStore();

  const responseStatus = await reviewStore.createReview(formData);

  if (responseStatus === 201) {
    const swal = Swal.mixin({
      customClass: {
        confirmButton:
          "btn bg-primary_p hover:bg-terciary_p p-4 rounded-lg font-bold",
      },
      buttonsStyling: false,
    });

    swal
      .fire({
        icon: "success",
        title: "Success",
        text: text_response,
        confirmButtonText: "OK!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          return true;
        }
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "something went wrong!",
      footer: "<a>Try again or try later.</a>",
    });
    return false;
  }
}
