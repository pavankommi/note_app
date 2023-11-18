import React from 'react'
import axios from 'axios'

const API_URL = 'http://3.145.19.122:8000/';
const headers = { 'Content-Type': 'application/json' };

const apiRequest = (method, url, data) => axios.request({
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${url}`,
    headers: headers,
    data: data
})

const noteRequest = (method, url, headers, data) => axios.request({
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${url}`,
    headers: headers,
    data: data
})

const deleteNoteRequest = (method, url, headers) => axios.request({
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${url}`,
    headers: headers,
})

const updateNoteRequest = (method, url, headers, data) => axios.request({
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${url}`,
    headers: headers,
    data: data
})

const logoutRequest = (method, url, headers) => axios.request({
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${url}`,
    headers: headers
})

const notesRequest = (method, url, headers) => axios.request({
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${url}`,
    headers: headers
})

export {
    apiRequest,
    logoutRequest,
    deleteNoteRequest,
    updateNoteRequest,
    noteRequest,
    notesRequest
};