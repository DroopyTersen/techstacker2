import { TagsDisplay } from "@components/tags";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import StackGrid from "../../Stacks/components/StackGrid";
import { Stack } from "../../Stacks/stack.data";
import { Tech } from "../tech.data";

interface Props {
  tech: Tech;
  stacks: Stack[];
}
export default function TechDetails({ tech, stacks = [] }: Props) {
  if (!tech) return null;

  return (
    <>
      {tech.logo && (
        <img
          src={tech.logo}
          className="img-responsive img-fit-cover"
          style={{ height: "min(55vh, 50vw)", width: "100%" }}
        ></img>
      )}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ marginTop: "30px" }}>{tech.title}</h1>
          <Link to={`/tech/${tech.id}/edit`} className="btn">
            EDIT
            <i className="icon icon-edit ml-2"></i>
          </Link>
        </div>
        <div className="columns">
          <section className="column col-8 col-md-12 tech-info">
            <>
              <h5 className="text-gray">{tech.tagline}</h5>
              {tech.link && (
                <div style={{ marginBottom: "30px" }}>
                  <a target="_blank" href={tech.link}>
                    {tech.link}
                  </a>
                </div>
              )}
              <div>
                {tech.layer && (
                  <Link className="btn btn-primary mr-1 mb-1" to={`/tech?layerId=${tech.layer.id}`}>
                    {tech.layer.title}
                  </Link>
                )}
                {tech.category && (
                  <Link
                    className="btn btn-primary mb-1"
                    to={`/tech?categoryId=${tech.category.id}`}
                  >
                    {tech.category.title}
                  </Link>
                )}
              </div>
              <div className="pt-2">
                <TagsDisplay tags={tech.tags} getLinkPath={(tag) => `/tech?tag=${tag}`} />
              </div>
              {tech.description && (
                <div style={{ margin: "30px 0 " }}>
                  <ReactMarkdown>{tech.description}</ReactMarkdown>
                </div>
              )}
            </>
            <></>
          </section>
          <div className="column">
            <h3>Stacks</h3>
            {stacks.length ? (
              <StackGrid stacks={stacks} />
            ) : (
              <p className="text-gray">No stacks are using this tech yet...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
