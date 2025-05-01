
import React from "react";
import { Shield, Lock, User } from "lucide-react";

const features = [
  {
    name: "Secure Authentication",
    description:
      "Industry-standard security practices to keep your data safe and protected at all times.",
    icon: Shield,
  },
  {
    name: "User Management",
    description:
      "Easily manage user accounts, permissions, and access control with our intuitive dashboard.",
    icon: User,
  },
  {
    name: "Data Protection",
    description:
      "Your data is encrypted and securely stored with regular backups and strict access controls.",
    icon: Lock,
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for authentication
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides a comprehensive solution for user authentication, 
            management, and data security.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col animate-slide-up">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-purple bg-opacity-10">
                    <feature.icon className="h-6 w-6 text-brand-purple" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;

