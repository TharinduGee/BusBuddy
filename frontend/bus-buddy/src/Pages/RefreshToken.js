import Swal from "sweetalert2";
import axios from "axios";
export function refreshTokenFetch(message) {
  setTimeout(function () {
    if (message == "Request failed with status code 403") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Session Has Expired",
          text: "Do You Want to Extend the Session?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No, Logout!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            getRefreshToken();
            window.location.reload();
            swalWithBootstrapButtons.fire({
              text: "Session Has Extended",
              icon: "success",
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              text: "Your Being Loging out",
              icon: "success",
            });

            localStorage.clear();
            window.location.href = "/";
          }
        });
    }
  }, 900);

  const getRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}api/v1/refreshToken?refreshToken=${refreshToken}`
    );
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }
  };
}
