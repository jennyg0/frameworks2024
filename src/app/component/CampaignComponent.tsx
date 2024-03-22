"use client";
import { useState } from "react";

export default function CampaignComponent() {
  const [startDate, setStartDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const ninetyDaysLater = new Date(
    new Date().setDate(new Date().getDate() + 90)
  )
    .toISOString()
    .split("T")[0];
  return (
    <div className='max-w-md mx-auto my-8 p-6 border rounded shadow-md'>
      <h1 className='text-2xl font-bold text-center mb-6'>
        Campaign Details Form
      </h1>
      <form className='space-y-4'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          ></textarea>
        </div>

        <div>
          <label
            htmlFor='goal'
            className='block text-sm font-medium text-gray-700'
          >
            Goal
          </label>
          <input
            type='number'
            id='goal'
            name='goal'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <div>
          <label
            htmlFor='start-date'
            className='block text-sm font-medium text-gray-700'
          >
            Start Date
          </label>
          <input
            type='date'
            id='start-date'
            name='start-date'
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>
        <div>
          <label
            htmlFor='end-date'
            className='block text-sm font-medium text-gray-700'
          >
            End Date
          </label>
          <input
            type='date'
            id='end-date'
            name='end-date'
            min={startDate || today}
            max={ninetyDaysLater}
            className='text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          />
        </div>

        <button
          type='submit'
          className='w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
