import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../services/userService";
import { Link } from "react-router-dom"

export const UserCard = ({user}) => {


    return (
      <>
      { user && (
          <div className="bg-gray-900 p-3 my-1 rounded-md max-w-64">
            username: <Link to={`/users/${user.id}`}><span className="underline text-cyan-600">{user.username}</span></Link>
            <br />
            name: {user.name}
            <br />
            blogs: {Object.keys(user.blogs).length}
          </div>)
      }
      </>
    )
}

export const UsersList = ({users}) => {

  return (
    <>
        <h1 className="text-xl py-2">Users</h1>
      {users ? (
        <ul className="flex flex-col gap-5 justify-center place-self-center">
          {users.map((user, index) => (
            <li key={index}>
                <UserCard user={user} />
            </li>
          ))}
        </ul>
      ) : <div>Loading </div>
    }
    </>
  );
};
