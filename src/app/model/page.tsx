"use client"

import Container from "@/components/common/Container"
import React from "react"
import ModelNav from "./modelrafia/ModelNav"
import ModelCard from "./modelrafia/ModelPage"

export default function ModelPage() {
  return (
    <div>
      <Container>
        <ModelNav />
        <ModelCard />
      </Container>
    </div>
  )
}
