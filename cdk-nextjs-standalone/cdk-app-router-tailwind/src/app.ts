#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AppRouterStack } from "./app-router-stack";

const app = new cdk.App();
new AppRouterStack(app, "app-tailwind"); // ar = app router
