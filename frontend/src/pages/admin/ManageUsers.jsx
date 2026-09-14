import React, { useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "Pharmacist",
      status: "Active",
    },
    {
      id: 3,
      name: "Arun Kumar",
      email: "arun@example.com",
      role: "User",
      status: "Blocked",
    },
  ]);

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1>Manage Users</h1>
        <p>
          View and manage registered users and pharmacists.
        </p>
      </div>

      <div className="users-card">

        <div className="users-card-header">
          <h2>Registered Users</h2>
          <span>
            {users.length} Users
          </span>
        </div>

        <div className="users-table-container">

          <table className="users-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr key={user.id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>
                    <span className="role-badge">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        user.status === "Active"
                          ? "status-active"
                          : "status-blocked"
                      }
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className={
                        user.status === "Active"
                          ? "block-button"
                          : "unblock-button"
                      }
                      onClick={() =>
                        toggleUserStatus(user.id)
                      }
                    >
                      {user.status === "Active"
                        ? "Block"
                        : "Unblock"}
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageUsers;