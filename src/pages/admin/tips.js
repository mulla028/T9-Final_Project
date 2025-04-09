import AdminTips from "@/components/AdminTips";

const TipsAdminPage = () => {
  return (
    <div className="container pt-5 position-relative">
      {/* Back Button */}
      <button
        className="btn btn-outline-secondary position-absolute"
        style={{ top: "100px", right: "20px" }}
        onClick={() => window.history.back()}
      >
        ⬅ Back
      </button>

      {/* <h1 className="mb-4">Manage Eco-Friendly Tips</h1> */}
      <AdminTips />
    </div>
  );
};

export default TipsAdminPage;
