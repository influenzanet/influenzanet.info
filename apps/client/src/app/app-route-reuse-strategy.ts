import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";
import { ComponentRef } from "@angular/core";

export class AppRouteReuseStrategy implements RouteReuseStrategy {
  storedRoutes : Map<string, DetachedRouteHandle> = new Map<string, DetachedRouteHandle>()

  // Determines if this route (and its subtree) should be detached to be reused later
  // it detach the route if it has the storeRoute property set to true
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return route.data['storeRoute'] }

  // Stores the detached route
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(getFullPath(route), handle)
  }

  // Determines if this route (and its subtree) should be reattached
  // Comparison based on navigation path
  shouldAttach(route: ActivatedRouteSnapshot): boolean { return this.storedRoutes.has(getFullPath(route)) }

  // Retrieves the previously stored route if shouldAttach returned true
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.storedRoutes.get(getFullPath(route))
  }

  // Determines if a route should be reused
  shouldReuseRoute(next: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return next.routeConfig === current.routeConfig;
  }
}

export interface OnAttach {
  onAttach(): void
}

export interface OnDetach {
  onDetach(): void
}

export const implementsOnAttach = (object: any): object is OnAttach => object && 'onAttach' in object
export const implementsOnDetach = (object: any): object is OnDetach => object && 'onDetach' in object


function getFullPath(route: ActivatedRouteSnapshot): string {
  return route.pathFromRoot
    .map(v => v.url.map(segment => segment.toString()).join("/"))
    .join("/")
    .trim()
    .replace(/\/$/, ""); // Remove trailing slash
}
