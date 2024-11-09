import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <div className="w-full lg:grid lg:grid-cols-3 min-h-[calc(100vh-52px)]">
=======
    <div className="w-full lg:grid lg:grid-cols-3 min-h-screen">
>>>>>>> ed53fb7 (Updated files)
      {children}
    </div>
  )
}