import React from "react";
import { useGqlQuery } from "../common/gql";
import { ErrorContainer } from "./errors";

export function GraphQL({ query, variables = {}, children, fallback }: GraphQLProps) {
  let { data, error, isLoading } = useGqlQuery(query, variables);

  if (error) {
    return <ErrorContainer title="Uh oh... GraphQL Error">{error + ""}</ErrorContainer>;
  }
  if (isLoading) {
    return fallback || <div className="m-2 p-2 loading loading-lg"></div>;
  }
  return children({ data });
}

interface GraphQLProps {
  query: string;
  variables?: {
    [key: string]: any;
  };
  children: ({ data }) => JSX.Element;
  fallback?: JSX.Element;
}
